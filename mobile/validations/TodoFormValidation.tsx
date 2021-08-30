import * as yup from 'yup';

export default function TodoFormValidation() {
  return (
    yup.object().shape({
      title: yup.string().typeError('string').required('Title can not be empty!'),
      description: yup.string().typeError('string').required('Description can not be empty!'),
    })
  )
}