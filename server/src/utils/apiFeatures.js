export class ApiFeatures {
    constructor(query, queryString) {
        this.query = query.select("-__v")
        this.queryString = queryString
    }



    filter(getQueryObj) {
        const queryCopy = {...this.queryString}
        const queryExcluded = ['sort', 'page', 'limit']
        queryExcluded.forEach(item => delete queryCopy[item])

        const queryStr = JSON.stringify(queryCopy)
        const queryObj = JSON.parse(queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`))
        for(let key in queryObj) {
            let originalKey = key
            if(key.includes('--')) {
                originalKey = key.replace('--','.')
                queryObj[originalKey] = queryObj[key]
                delete queryObj[key]
            }
                queryObj[originalKey] = new RegExp(`^${queryObj[originalKey]}`, 'i')
        }
        if(getQueryObj) return queryObj
        this.query.find(queryObj)

        return this;
    }

    sort () {
        if(this.queryString.sort) {
            this.query.sort(this.queryString.sort) // ex -date || +date
        }

        return this;
    }

    paginate () {
        if(+this.queryString.page === 0) return this;

        const page = +this.queryString.page || 1
        const limit = +this.queryString.limit || process.env.PAGE_LIMIT
        const skip = (page - 1) * limit
        this.query.skip(skip).limit(limit)

        return this;
    }
}