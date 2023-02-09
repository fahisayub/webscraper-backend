const { UrlModel } = require("../models/url.model");
const extractor = require('unfluff');
const { spawn } = require('child_process');
const fs = require('fs');



const scrapUrl = async (req, res) => {
  const { url } = req.body;
  let payload = { url };
  try {
    const scrap =await spawn('curl', ['-s', url]);
    let result = '';
    scrap.stdout.on('data', data => {
      result += data.toString();
    });

    scrap.on('close', () => {
      const data = extractor(result);
      const textdata = data.text;
      const media = data?.videos;
      data.image && media.push({ src: data.image });
      const links = data?.links;
      fs.writeFile('scraptext.txt', textdata, async() => {

        const wc = await spawn('wc', ['-w', 'scraptext.txt'])
        let result = '';
        wc.stdout.on('data', data => {
          result = data.toString();
        });
        wc.on('close', async () => {
          payload.media = media;
          payload.links = links;
          payload.count = parseInt(result.split(' ')[0], 10);
          await UrlModel.insertMany([{ ...payload }]);
          res.send(payload);
        });
      });
    });

  } catch (err) {
    res.send({ msg: "Something went wrong adding data items", error: err });
  }

};

const updateUrl = async (req, res) => {
  let { id } = req.params;
  try {
    let update = req.body;
    let newurl = await UrlModel.updateOne(
      { _id: id },
      { ...update }
    );
    res.send({ msg: "Url updated successfully", newurl });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
};

const deleteUrl = async (req, res) => {
  let { id } = req.params;
  try {
     await UrlModel.deleteOne({ _id: id });
    res.send({ msg: "Url deleted successfully" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
};
const getHistory=async(req,res)=>{
  try{
    let history=await UrlModel.find({});
    res.send({ msg: "History data",data:history})
  }catch(e){
    res.send({ msg: "Something went wrong", error:e.message });
  }
  
}

const urlController = {
  scrapUrl,updateUrl,deleteUrl,getHistory

};
module.exports = {
  urlController,
};


