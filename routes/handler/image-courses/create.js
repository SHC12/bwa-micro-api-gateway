const apiAdapter = require('../../apiAdapters');

const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req,res) => {
    try{
        const image = await api.post('/api/image-courses',req.body);
        return res.json(image.data);
    }catch (error){

        if(error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status:'error',message: 'service unavailable'
            });
        } 

        const {status,data} = error.response;
        return res.status(status).json(data);

    }
}