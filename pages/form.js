
import {useState} from 'react';
const myForm = () => {

    const [data, setData] = useState('') ;
const handleChange = (e) => {
e.preventDefault();
setData(e.target.value)
}
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submited')
}
console.log("useData", data)
    return (
        <div> =
             <h1>hello </h1>
   <form>
    <label> enter the Id of the movie you want to search :</label>
    <input type="text"
    value={data}
    name='id'
    onChange={handleChange}
    onSubmit={handleSubmit}
    ></input>
   </form>
        </div>
    )
}
export default myForm ;
