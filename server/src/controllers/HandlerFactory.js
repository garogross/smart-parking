import {catchAsync} from "../utils/catchAsync.js";
import {AppError} from "../utils/appError.js";
import {ApiFeatures} from "../utils/apiFeatures.js";
import {isValidDate} from "../utils/date.js";

export class HandlerFactory {
    constructor(Model, docName) {
        this.Model = Model
        this.docName = docName
    }

    create() {
        const {Model} = this
        return catchAsync(async function (req, res) {
            const newDoc = await Model.create(req.body)
            res.send({
                status: 'success',
                data: newDoc
            })
        })
    }

    updateOne(isMiddleware) {

        const {Model, docName} = this
        return catchAsync(async function (req, res, next) {
            const resData = req.body
            const doc = await Model.findByIdAndUpdate(req.params.id || req.user.id, resData, {
                new: true,
                runValidators: true
            })

            if (!doc) {
                return next(new AppError(`No ${docName} found with that id`, 404))
            }

            if (isMiddleware) return next()

            res.send({
                status: 'success',
                data: doc
            })
        })
    }

    deleteOne(isMiddleware) {
        const {Model, docName} = this
        return catchAsync(async function (req, res, next) {
            const doc = await Model.findByIdAndDelete(req.params.id)

            if (!doc) {
                return next(new AppError(`No ${docName} found with that id`, 404))
            }

            if (isMiddleware) return next()

            res.status(200).send({
                status: 'success',
                data: doc
            })
        })

    }

    deleteAll() {
        const {Model} = this
        return catchAsync(async (req, res) => {
            await Model.deleteMany()
            res.status(200).send({
                status: 'success',
                message: 'cleared'
            })
        })
    }

    getMe() {
        return function (req, res, next) {
            req.params.id = req.user.id
            next()
        }
    }

    getOne(populateOptions) {
        const {Model, docName} = this
        return catchAsync(async (req, res, next) => {
            let query = Model.findById(req.params.id)
            if (populateOptions) {
                query = query.populate(populateOptions)
            }
            const doc = await query


            if (!doc) {
                return next(new AppError(`No ${docName} found with that id`, 404))
            }

            res.send({
                status: 'success',
                data: doc
            })
        })
    }

    getAll(populateOptions, filterBy, project, isMiddleware) {
        const {Model, docName} = this
        return catchAsync(async (req, res, next) => {
            let match = filterBy ? filterBy(req) : {}
            const {page, ...query} = req.query
            const booleanProps = [
                {
                    str: 'true',
                    bool: true,
                },
                {
                    str: 'false',
                    bool: false,
                },
            ]

            for (let key in query) {
                let originalKey = key
                const booleanItem = booleanProps.find(item => item.str === query[key])
                if (key.includes('--')) originalKey = key.replaceAll('--', ".")

                if (!isNaN(+query[key])) {
                    match[originalKey] = {
                        $eq: +query[key]
                    }
                }else if (isValidDate(query[key])) {
                    const date  = new Date(query[key])

                    const nextDay = new Date(date)
                    nextDay.setDate(date.getDate() + 1)
                    match[originalKey] = {
                        $lt: nextDay,
                        $gte: date
                    }
                } else if(booleanItem) {
                    match[originalKey] = { $exists: booleanItem.bool }
                } else {
                    match[originalKey] = {$regex: `^${query[key]}`, $options: 'i'}
                }
            }
            const curPage = page ? +page : 1
            const pageSize = +process.env.PAGE_LIMIT;
            const skipDocuments = (curPage - 1) * pageSize
            const aggregateData = curPage === 0 ?
                [] :
                [
                    {$skip: skipDocuments},
                    {$limit: pageSize},
                ]

            let aggregateOptions = [
                {
                    $match: match
                },
            ]

            if (populateOptions) {
                const setPopulateOptions = ({from, localField, foreignField, as}) => {
                    const result = [
                        {
                            $lookup: {
                                from,
                                localField: localField || '_id',
                                foreignField: foreignField || '_id',
                                as: as || localField
                            }
                        },
                    ]

                    if (!foreignField) {
                        result.push({
                            $unwind: {
                                path: `$${as || localField}`,
                                preserveNullAndEmptyArrays: true
                            }
                        })
                    }

                    return (result)
                }
                const populations = populateOptions.flatMap(setPopulateOptions)

                aggregateOptions = [
                    ...populations,
                    ...aggregateOptions
                ]
            }
            if (project) aggregateOptions.push({$project: project})
            aggregateOptions.push({
                $facet: {
                    totalCount: [
                        {$count: "count"}
                    ],
                    data: aggregateData
                }
            })


            let doc = await Model.aggregate(aggregateOptions)
            if (!doc[0]) return next(new AppError(`${docName} not found`))

            const {data, totalCount} = doc[0]

            if (isMiddleware) {
                req.data = data;
                return next()
            }

            res.send({
                status: 'success',
                result: data.length,
                data,
                totalCount: totalCount[0]?.count || 0
            })
        })
    }
}