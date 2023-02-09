const {Router} =require('express');
const {urlController} =require('../controllers/url.controller')

const urlRouter=Router();

urlRouter.post('/',urlController.scrapUrl);
urlRouter.put('/:id',urlController.updateUrl);
urlRouter.delete('/:id',urlController.deleteUrl);
urlRouter.get('/history',urlController.getHistory)


module.exports={
    urlRouter,
}