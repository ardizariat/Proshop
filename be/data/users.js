import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

const users = [
  {
    name: 'ardi',
    username: 'ardi',
    email: 'ardi@mail.com',
    password: bcrypt.hashSync('admin', salt),
    isAdmin: true,
    refreshToken: null,
  },
  {
    name: 'user',
    username: 'user',
    email: 'user@mail.com',
    password: bcrypt.hashSync('user', salt),
    refreshToken: null,
  },
]

export default users
