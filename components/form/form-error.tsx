interface FormError {
  message: string;
}
export const FormError = ({ message }: FormError) => {
  return <div className="bg-red-100 text-gray-800 p-4 rounded">{message}</div>;
};
