import React from 'react'
import { Helmet } from "react-helmet";


function ForgotPassword() {
    return (
        <div>
        <Helmet>
                <style>{"body { background: url('https://images.unsplash.com/photo-1617069489895-76388f95886a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80');background-position: center; }"}</style>
            </Helmet>
            <br/>
            <h1 className="centertitle"> Contact Admin ! </h1>
            <table className="admintable">
        <tr>
          <th></th>
          <th></th>
        </tr>
            <tr>
              <td>Email : </td>
              <td className="secondcolumn">fruitpluckadmin@gmail.com</td>
            </tr>
            <tr>
              <td>Contact No : </td>
              <td className="secondcolumn">+14090302830, +91-021308009</td>
            </tr>
            <tr>
              <td>Admin Office Address: </td>
              <td className="secondcolumn">Road no 14, 3-D Block 4th Floor, Madhapur</td>
            </tr>
      </table>
        </div>
    )
}

export default ForgotPassword
