import * as yup from 'yup';

export default function RegistrationFormValidation() {
  return (
    yup.object().shape({
      username: yup.string().typeError('string').required('Username field can not be empty!'),
      email: yup.string().email('Appropriate e-mail is required!').required('E-mail field can not be empty'),
      password: yup.string().typeError('string').required('Password field can not be empty!'),
      passwordVerification: yup.string().oneOf([yup.ref('password')], 'Passwords do not match!').required('Password verification is needed!'),
    })
  )
}
