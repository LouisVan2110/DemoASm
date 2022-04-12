var express = require('express');
var router = express.Router();
// Kết nối MongooDB

var fs = require('fs');

var db = 'mongodb+srv://mySever:GlqKpTEz0HjsSfZo@sever.noqan.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
var hinhAnhSch = new mongoose.Schema({
  tenHA : 'string',
  noiDungHA : 'string',
  ngayThangHA : 'string',
  linkHA : 'string'
});
var HinhAnh = mongoose.model('hinhanh', hinhAnhSch);

//===========================================================


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insertPhoto',function (req,res) {
  console.log('InsertPhoto')
  res.render('insertPhoto',{title : 'InsertPhoto'});
})

router.get('/updatePhoto',function (req,res) {
  console.log('UpdatePhoto')
  res.render('updatePhoto',{title : 'UpdatePhoto'});
})

router.get('/homePhoto',function (req,res) {
  console.log('HomePhoto')
  HinhAnh.find({}, function (err, data){
    res.render('homePhoto', {data: data});
    console.log(data)
  })
})





// Thêm Photo
router.post('/insertHA', function (request, response){

  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var ngayThangHA = request.body.ngayThangHA;
  var linkHA = request.body.linkHA;


  console.log(tenHA + noiDungHA + ngayThangHA + linkHA);

  const data = new HinhAnh({
    tenHA : tenHA,
    noiDungHA : noiDungHA,
    ngayThangHA : ngayThangHA,
    linkHA : linkHA
  });

  data.save(function (error){
    var mes;
    if (error == null){
      mes = 'them thanh cong'
      console.log('them thanh cong')
    }else mes = error
    response.render('insertPhoto', {message: mes});
  })
});



// sửa ảnh
router.post('/upDateHA', function (request, response){
  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var ngayThangHA = request.body.ngayThangHA;
  var linkHA = request.body.linkHA;

  console.log(tenHA + noiDungHA + ngayThangHA + linkHA);

  HinhAnh.updateOne({tenHA : tenHA}, {tenHA: tenHA, noiDungHA : noiDungHA,ngayThangHA : ngayThangHA , linkHA: linkHA}, function (err){
    if(err) throw err;
    console.log('Sua thanh cong');
  });
});

router.post('/dataUpdate', function (request, response){
  var idAnhUpdate = request.body.idAnhUpdate;

  console.log(idAnhUpdate);
  HinhAnh.find({_id : idAnhUpdate}, function (err, data){
    response.render('updatePhoto', { data: data });
  })
});




// Xóa ảnh
router.post('/deleteHA', function (request, response){
  var idAnh = request.body.idAnh;

  console.log(idAnh);

  HinhAnh.deleteOne({_id : idAnh},  function (err){
    if(err) throw err;
    console.log('Xoa thanh cong');
  });
});



// Upload React
router.get('/newReact', function(req, res) {
  HinhAnh.find({}, function (err, data){
    res.send( data );
  })
});






module.exports = router;
