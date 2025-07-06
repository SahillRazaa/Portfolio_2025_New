import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';
import axios from 'axios';
import { ShowToast } from '../utils/ShowToast';

// ==== Styled Components ====

const Container = styled.section`
  padding: 2vw 10vw;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #0a2540;
  margin: 0 0 3rem 0;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4rem;
    height: 4px;
    background: #0467d5;
    border-radius: 2px;
  }

  @media (max-width: 900px) {
    font-size: 2rem;
  }

  @media (max-width: 550px) {
    font-size: 1.4rem;
  }

  @media (max-width: 370px) {
    font-size: 1.2rem;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  padding: 3rem;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s, box-shadow 0.4s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  }
`;

const IconDecor = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  background: #0467d5;
  padding: 1rem;
  border-radius: 50%;
  opacity: 0.1;

  svg {
    width: 40px;
    height: 40px;
    color: #0467d5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  width: 98%;

  &:focus {
    border-color: #0467d5;
    box-shadow: 0 0 0 3px rgba(4, 103, 213, 0.1);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  width: 98%;

  &:focus {
    border-color: #0467d5;
    box-shadow: 0 0 0 3px rgba(4, 103, 213, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  background: #0467d5;
  color: #fff;
  padding: 1rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background: #035ac2;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const InfoBanner = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #0467d5;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const formatEmailMessage = useCallback(({ name, email, message }) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; line-height: 1.5;">${message}</p>
      </div>
    `;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { name, email, message } = form;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      return ShowToast({ type: 'error', title: 'Invalid Name', message: 'Please enter a valid name.' });
    }

    if (!emailRegex.test(trimmedEmail)) {
      return ShowToast({ type: 'error', title: 'Invalid Email', message: 'Please enter a valid email address.' });
    }

    if (trimmedMessage.length < 10) {
      return ShowToast({ type: 'error', title: 'Message Too Short', message: 'Please write a detailed message.' });
    }

    const BREVO_API_KEY = import.meta.env.VITE_BREVO_API;
    if (!BREVO_API_KEY) {
      return ShowToast({ type: 'error', title: 'Missing Config', message: 'Email service is not configured.' });
    }

    setLoading(true);

    try {
      const emailData = {
        sender: { name: 'Sahil Raza', email: 'connectwithsahil007@gmail.com' },
        to: [{ name: 'Sahil Raza', email: 'connectwithsahil007@gmail.com' }],
        subject: `New Connect Message from ${trimmedName}`,
        htmlContent: formatEmailMessage({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
      };

      const response = await axios.post('https://api.brevo.com/v3/smtp/email', emailData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
      });

      if (response.status === 201) {
        ShowToast({
          type: 'success',
          title: 'Message Sent',
          message: "Thanks for reaching out to Sahil Raza! He'll get back to you shortly.",
        });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      ShowToast({
        type: 'error',
        title: 'Send Failed',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }, [form, formatEmailMessage]);

  return (
    <Container id="contact" ref={ref}>
      <Title>Contact Me</Title>
      <Card>
        <IconDecor><Send /></IconDecor>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              required
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              required
              placeholder="your@email.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              required
              placeholder="Your message..."
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
          </Button>
        </Form>
        <InfoBanner>
          Or reach out directly at <a href="mailto:connectwithsahil007@gmail.com">connectwithsahil007@gmail.com</a>
        </InfoBanner>
      </Card>
    </Container>
  );
};

export default React.memo(Contact);
