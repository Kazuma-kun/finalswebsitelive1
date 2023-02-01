import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//error messages if input are incorrect
const schema = yup.object().shape({
    firstname: yup.string().required("Provide your firstname first"),
    lastname: yup.string().required("Provide your lastname first"),
    email: yup.string().email().required(),
    phonenumber: yup.string().matches((/^(09|\+639)\d{9}$/), 'Wrong input number').required(),
    address: yup.string().required("Put your address first"),
    choices: yup.string().nullable().required("Choice are not selected"),
    reason: yup.string().required("Add your reason first")
  }).required();
  
  //function to send the data by submitting/register
  export default function Main() {
    const { register, handleSubmit, formState: { errors }} = useForm({
      resolver: yupResolver(schema)
    });
  
    const onSubmit = async (data) => {
      try {
        //pathfile of backend/ database and api
        fetch("/api/backend", {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(data)
        })
        alert("Your info has been added successfully")
      } catch (err) {
        alert(err);
      }
    }
    //front-end design with functionality to send the data by submit
    // css design at global.css since only one page exist 
    return (
      <div>
     <meta charSet="UTF-8" />
    <title> Registration Form </title>
    <link rel="stylesheet" href="style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div className="container">
      
      <div className="title">Registration</div>
      <div className="content">
        
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="user-details">
            <label className="input-box">
              <span className="details">Firstname</span>
              <input type="text" name="firstname"{...register("firstname")}/>
              <p> {errors.firstname?.message} </p>
            </label>
            <label className="input-box">
              <span className="details">Lastname</span>
              <input type="text" name="lastname"{...register("lastname")}/>
              <p> {errors.lastnamename?.message} </p>
            </label>
            <label className="input-box">
              <span className="details">Email</span>
              <input type="text" name="email"{...register("email")}/>
              <p> {errors.email?.message} </p>
            </label>
            <label className="input-box">
              <span className="details">Phone Number</span>
              <input type="text" name="phonenumber"{...register("phonenumber")}/>
              <p> {errors.phonenumber?.message} </p>
            </label>
            <label className="input-box">
              <span className="details">Address</span>
              <input type="text" name="address"{...register("address")}/>
              <p> {errors.address?.message} </p>
            </label>
            <label className="input-box">
              <span className="details">Why do you want to study here?</span>
              <input type="text" name="reason"{...register("reason")}/>
              <p> {errors.reason?.message} </p>
            </label>
          </div>
          <div className="choices-details">
            <input type="radio" name="choices" id="dot-1" value ="yes"{...register("choices")}/>
            <input type="radio" name="choices" id="dot-2" value ="no" {...register("choices")}/>
            <input type="radio" name="choices" id="dot-3" value = "rathernot"{...register("choices")} />
            <span className="choices-title">Are you old student here?</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one" />
                <span className="choices">Yes</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two" />  
                <span className="choices">No</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three" />
                <span className="choices">Prefer not to say</span>
              </label>
              <p> {errors.choices?.message} </p>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Submit" />
          </div>
          </form>
      </div>
    </div>
      </div>
    
    )
  }