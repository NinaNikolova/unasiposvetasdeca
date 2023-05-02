import { useState } from "react";


export const useForm = (initialValues, onSubmitHandler) => {

    const [values, setValues] = useState(initialValues);

       const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }
 
    const onSubmit = (e) => {
        e.preventDefault();
        if(Object.values(values).some(x=>x==='')){
            return alert("Моля, попълнете всички полета!")
        }
        const passwordRegex =/.*EmI.*/
        if(values.password){
            if(passwordRegex.test(values.password)==false){
                return alert('Грешка! Свържи се с admin...');
              
            }
            if(values.password.length<6){
                return alert('Грешка! Свържи се с admin...;) ');
               
            }
        }


         onSubmitHandler(values)
          setValues(initialValues)

       
    }
    return {
        values,
        changeHandler,
        onSubmit
    }
}
