import React from "react";
import Slider from "../../components/Slider";
import "./index.module.css";
import { FaRegEye } from "react-icons/fa";
export default function LoginPage() {
  return (
    <div className="col-12 h-100 d-flex">
      <div
        className="col-12 col-md-5 h-100 position-relative"
        style={{ background: "var(--white)" }}
      >
        
        <Slider />
        <h4
          className="position-absolute col-12 text-center"
          style={{ bottom: "2rem", zIndex: "200" }}
        >
          Manage Sales , Inventory <br />
          and Other Transactions
        </h4>
      </div>
      <div className="col-7 h-100">
        <div className="col-12 h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="col-12 col-sm-8 col-md-7 p-4">
            <h2 className="fw-bold mb-1">Welcome Back!</h2>
            <p className="text-muted mb-4 small">Please, sign in to continue</p>

            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control py-2 bg-light"
                  placeholder="Sales ID number"
                />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="password"
                  className="form-control py-2 bg-light"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="btn position-absolute end-0 top-0 h-100 border-0"
                >
                  <FaRegEye />
                </button>
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 mb-3 border-0 bg-warning"
              >
                Sign in
              </button>

              <div className="text-center text-muted mb-3">
                <span>or</span>
              </div>

              <div className="d-flex gap-2 mb-3 social">
                <button
                  type="button"
                  className="col-6 btn border border-opacity-50 d-flex align-items-center justify-content-center gap-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google"
                    width="20"
                  />
                  <span className="small">Sign up with Google</span>
                </button>
                <button
                  type="button"
                  className="col-6 btn border border-opacity-50 d-flex align-items-center justify-content-center gap-1"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                    alt="Facebook"
                    width="20"
                  />
                  <span className="small">Sign up with Facebook</span>
                </button>
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="d-block mb-2 text-decoration-none text-primary"
                >
                  Forgot password?
                </a>
                <p className="mb-0 small text-muted">
                  Don't have an account?
                  <a href="#" className="text-decoration-none text-black">
                    Go to Registration
                  </a>
                </p>
              </div>
            </form>


          </div>
          <footer className="text-center mt-5">
              <p className="text-muted small mt-5">© 2023 SmartPOS App</p>
            </footer>
        </div>
      </div>
    </div>
  );
}
