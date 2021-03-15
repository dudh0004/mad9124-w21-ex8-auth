const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDRmYmUzYTE3MTJhZjA5MjE1MDg0N2UiLCJpYXQiOjE2MTU4Mzg3OTN9.NwG0G8ovTOTBzbSovIRwrdfWwPy0E7Dk8pPvcfEbgwU'

fetch('/auth/users/me', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`
    }
})
