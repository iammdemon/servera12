const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Emplyee = require("./models/EmplyeeRegister");
const Admin = require("./models/AdminRegister");
const jwt = require('jsonwebtoken');
const Assest=require('./models/Assest')
const RequestsAssets=require('./models/Requestasset')
const CustomReq=require('./models/CustomReq')


const app = express();


app.use(express.json());
app.use(cors());
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://amsadmin:EmonSEO2022@ams.5dm1ndq.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("database connected");
}

app.listen(5000, (res, req) => {
  console.log("Server is running on port :5000 ");
});




app.post("/EmplyeeRegister", function (req, res) {
  let newEmp = new Emplyee({
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    DOF: req.body.DOF
  });

  newEmp
    .save()
    .then(() => {
      res.send("Emplyee Registered Successfully");
    })
    .catch((error) => console.log(error));
});


app.post("/AdminRegister", function (req, res) {
  let newAdmin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    DOF: req.body.DOB,
    logoImage: req.body.postImage.myFile,
    packages:req.body.packages,
    Companyname:req.body.Companyname,
  });

  newAdmin
    .save()
    .then(() => {
      res.send("Admin/HR Registered Successfully");
    })
    .catch((error) => console.log(error));
});

app.post("/login", async function (req, res) {
  // check if the user exists
  try{
  const user = await Emplyee.findOne ({ email: req.body.email , password:req.body.password })
  const usertoken = jwt.sign({ _id: user._id,_email:user.email }, '321', {
    expiresIn: '1h',
  })
  res.status(200).json({ usertoken, _userid: user._id,_email:user.email, });

} catch (e){
  console.log('Error in login')

  }
});
app.get("/getEmplyee", (req, res) => {
  Emplyee.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get('/search', async (req, res) => {
  try {
    const query = req.query;

    // Use the $text operator to perform a text search
    const results = await Emplyee.find({ $text: { $search: query } });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post("/addAssest", function (req, res) {
  let newAssest = new Assest({
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity,
  });

  newAssest
    .save()
    .then(() => {
      res.send("Asset added Successfully");
    })
    .catch((error) => console.log(error));
});

app.get("/getAsset", (req, res) => {
  Assest.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Assest.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


app.put("/update/:id", (req, res) => {
  Assest.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.post("/assetrequest", async (req,res)=>{

  const user = await Emplyee.findOne ({ _id: req.body.id })

  let newRequest=new RequestsAssets({
    userId:req.body.empid,
    name:req.body.name,
    type:req.body.type,
    quantity:req.body.quantity-1,
    requsteremail:user.email,
    requesterName:user.name,
   
    // requestDate:req.body.requestDate,
    status:"Pending"
    })
    newRequest.save().then(()=>{
      res.status(200).json({message:'Success'})
      }).catch((err)=>console.log(err))

})
app.get("/getAssetreq", (req, res) => {
  RequestsAssets.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.put("/Approve/:id", (req, res) => {
  RequestsAssets.findByIdAndUpdate(
    { _id: req.params.id },
    {
      status: "approval",
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.get("/getseller", (req, res) => {
  RequestsAssets.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
app.put("/cancelseller/:id", (req, res) => {
  RequestsAssets.findByIdAndUpdate(
    { _id: req.params.id },
    {
      status: "disapproval",
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


app.post("/customAssest", function (req, res) {
  let newCustomReq = new CustomReq({
    requsteremail:req.body.email,
    assetname: req.body.updatedPost.assestname,
    type: req.body.updatedPost.type,
    price: req.body.updatedPost.Price,
    whyneeded: req.body.updatedPost.whyneeded,
    aditionalinfo: req.body.updatedPost.Additionalinformation,
    reqdate: req.body.updatedPost.Requestdate,
    status:req.body.updatedPost.Status,
  });

  newCustomReq
    .save()
    .then(() => {
      res.send("request sent Successfully");
    })
    .catch((error) => console.log(error));
});

app.get("/getcustomReq", (req, res) => {
  CustomReq.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
})


app.delete("/customofferdelete/:id", (req, res) => {
  console.log(req.params);
  CustomReq.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});