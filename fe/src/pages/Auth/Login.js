import axios from 'axios'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Gap, InputForm } from '../../components'
import api from '../../services/api'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'http://127.0.0.1:8000/api/auth/login',
        JSON.stringify(formData),
        config
      )
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Gap height={100} />
      <Row className="d-flex justify-content-center">
        <Col lg={4} xl={4} md={6} sm={12}>
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <Link
                to="/login"
                className="nav-link active"
                id="tab-login"
                data-mdb-toggle="pill"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link"
                id="tab-register"
                data-mdb-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <InputForm
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    value={formData.username}
                    id="username"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <InputForm
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                    type="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
                <div className="text-center">
                  <p>
                    Not a member? <a href="#!">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Login
