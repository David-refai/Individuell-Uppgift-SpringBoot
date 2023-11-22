import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessSnipp = ({ message }) => {
  const [showSuccess, setShowSuccess] = useState(true);
  const navigate = useNavigate();

  // const handleSuccess = () => {
  //   setShowSuccess(true);
  // };

  // useEffect to hide the success message after a certain time (e.g., 3000 milliseconds)
  useEffect(() => {
    if (showSuccess) {
      const timeoutId = setTimeout(() => {
        setShowSuccess(false);
         navigate('/users');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showSuccess, navigate]);

  return (
    <div>


      {showSuccess && (
        <div
          style={{
            color: '#28a745', // Green color for success
            fontSize: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '1px solid #28a745', // Optional: add a border for better visibility
            borderRadius: '5px', // Optional: add border radius for a rounded look
            padding: '10px', // Optional: add padding for spacing
            margin: '10px 0', // Optional: add margin for spacing
          }}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default SuccessSnipp;
