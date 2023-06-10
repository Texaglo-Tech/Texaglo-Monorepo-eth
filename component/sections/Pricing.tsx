import styles from "../../styles/page/landing.page.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "../modals/modal";
import Modal2 from "../modals/modal2";
import Modal3 from "../modals/modal3";
import Grid from "@mui/material/Grid";
import Register from "../forms/register";
import GetTrainedForm from "../forms/Entrepenuer";
import WorkOnAProjectForm from "../forms/Builder";

const contact = () => {
  const [project, setProject] = useState();
  const router = useRouter();
  // this function will be called when a radio button is checked
  const handleChange = (e) => {
    setProject(e.target.value);
  };

  

  return (
    <div
      id="contact"
      style={{ paddingBottom: "5%", paddingTop: 100, scrollMarginTop: "70px" }}
      className={"container"}
    >
      <div className={styles.slider_title} style={{ marginBottom: "50px" }}>
        <span
          style={{
            textAlign: "left",
            color: "var(--bs-gray-dark)",
            marginTop: "38px",
            marginBottom: "0px",
            fontWeight: "bold",
            fontSize: "13px",
            lineHeight: "16.5px",
          }}
          className={styles.slider_title_header}
        ></span>
        <br />
        <span
          style={{
            textAlign: "left",
            color: "var(--bs-gray-dark)",
            marginTop: "0px",
            marginBottom: "20px",
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "bold",
          }}
          className={styles.slider_title_content}
        >
          Join the Network state
        </span>
      </div>
      <Grid container spacing={2}>
      <Grid item lg={4} xs={12}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f1f1f1',
              color: '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            Member
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            $60 
          </h1>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
            }}
          >
            Our Go-to package for those just getting started in WEB3. Our holders get these features forever:
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              width: '100%',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              padding: '1rem 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Access to Level 1 creator tools</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>A custom Domain</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Account Dashboard</p>
            </div>
          </div>
          <div
            style={{
              marginTop: '1rem',
            }}
            id="modal-root"
          >
            <Register />
            {/* Uncomment the above line to include the form component */}
          </div>
        </div>
      </div>
    </Grid>
    <Grid item lg={4} xs={12}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f1f1f1',
              color: '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            Partner
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            $19.99 / Month
          </h1>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
            }}
          >
            Perfect for those that want the features but also want their own look and feel. Builders get:
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              width: '100%',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              padding: '1rem 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Access to Level 2 Creator Tools</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Texaglo NFT API</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Builder training videos</p>
            </div>
          </div>
          <div
            style={{
              marginTop: '1rem',
            }}
            id="modal-root"
          >
             <GetTrainedForm />
            {/* Uncomment the above line to include the form component */}
          </div>
        </div>
      </div>
    </Grid>
    <Grid item lg={4} xs={12}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f1f1f1',
              color: '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            Builder
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            $199.99 / Month
          </h1>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.5',
            }}
          >
            Looking to build a web3 business fast without the high cost? This is the product for you.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              width: '100%',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              padding: '1rem 0',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Access to Level 3 Creator Tools</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Texaglo NFT API</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p>Entrepreneur training videos</p>
            </div>
          </div>
          <div
            style={{
              marginTop: '1rem',
            }}
            id="modal-root"
          >
             <WorkOnAProjectForm /> 
            {/* Uncomment the above line to include the form component */}
          </div>
        </div>
      </div>
    </Grid>
      </Grid>
    </div>
  );
};
export default contact;
