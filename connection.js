const mongoose=require("mongoose")

exports.connect=()=>{
    try{
      



        const MONGO_URL =`mongodb+srv://joeycool:nW3v4sVwprvCdQ5D@cluster0.gnbup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
          
            useUnifiedTopology: true,
         
        })
        const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
    }
    catch(e){
        console.log(e)
        process.exit()
    }
} 