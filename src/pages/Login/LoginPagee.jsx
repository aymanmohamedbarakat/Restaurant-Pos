import axios from "axios";
import { useRef } from "react"
import { useCategories } from "../../Store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPagee() {
    const { domain } = useCategories();
    const navigate = useNavigate();
    const phoneInput = useRef();
    const passwordInput = useRef();
    const handleLogin = (event) => {
        event.preventDefault();
        let url = domain + '/api/pos-users'
        axios.get(url, {
            params: {
                filters: {
                    $and: [
                        {
                            user_phone: {
                                $eq: phoneInput.current.value,
                            }
                        },
                        {
                            user_password: {
                                $eq: passwordInput.current.value
                            }
                        }
                    ]
                }
            }
        }).then((res) => {
            if (res.data.data.length == 1) {
                let userInfo = res.data.data[0];
                let userData = {
                    user_name: userInfo['user_name'],
                    user_role: userInfo.user_role,
                    user_id: userInfo.documentId,
                }
                sessionStorage.setItem("userInfo", JSON.stringify(userData));
                Swal.fire({
                    icon: "success",
                    text: "Login Success",
                    timer: 1500,
                }).then(() => {
                    navigate('/');
                })

            } else {
                alert('Wrong Username Or Password');
            }
            console.log(res.data);
        })
    }

    return (
        <div className="d-flex flex-column container align-items-center">
            <form onSubmit={handleLogin} className="col-10 d-flex flex-column gap-2 col-md-6 col-lg-5 bg-white shadow border rounded-3 p-3 mt-5">
                <h3>Welcome , Login To POS</h3>
                <input ref={phoneInput} className="form-control" type="text" placeholder="Enter your Phone No" />
                <input ref={passwordInput} className="form-control" type="password" placeholder="Enter your password" />
                <button className="btn btn-primary col-12">Login</button>
            </form>
        </div>
    )
}
