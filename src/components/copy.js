          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }

          if (res.data === 'Token Not found')
          {
            Navigate("/loginpage")
          }
          else
          {
            
          }

        .then((res)=>
        {
            if (res.data === 'Token Not found')
            {
                Navigate("/loginpage")
            }
            else
            {
                
            }
            
        })

    import { useNavigate } from "react-router-dom"
    const Navigate = useNavigate();

    const token = useSelector((state)=>{
        return state.auth.token;
    })

          