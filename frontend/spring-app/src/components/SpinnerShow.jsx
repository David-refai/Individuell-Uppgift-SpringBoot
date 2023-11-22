import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpinnerShow = ({url}) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShow(false);
      navigate(url);
    }, 3000);

    // Clear the timeout when the component unmounts or when the 'show' state changes
    return () => clearTimeout(timeoutId);
  }, [url, navigate]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // position: 'fixed',
        zIndex: '9999',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      {show && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
    </div>
  );
};

export default SpinnerShow;
