import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, IconButton, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Email, Lock, Person, ArrowForward, Visibility, VisibilityOff, Security, FlashOn, Public } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BaseUrl from '../Api.jsx';
import SignavoxLogo from '../assets/snignavox icon.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - 60% */}
      <div className="w-full md:w-[60%] flex flex-col justify-center items-start px-6 md:px-12 py-10 bg-gradient-to-br from-[#311188]/80 to-[#0A081E]/90 relative z-10 min-h-screen">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full">
          <div className="flex items-center gap-0 mb-2">
            <span className="text-4xl md:text-5xl xl:text-6xl font-bold bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 font-spoof leading-none">SIGN</span>
            <img src={SignavoxLogo} alt="Signavox Logo" className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 align-middle inline-block mx-2" style={{ verticalAlign: 'middle' }}/>
            <span className="text-4xl md:text-5xl xl:text-6xl font-bold bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 font-spoof leading-none">VOX</span>
          </div>
          <Typography variant="h4" className="text-white font-bold mb-2 font-spoof mt-4">" Solution that speaks success "</Typography>
          <Typography variant="body1" className="text-purple-100 mb-8 font-spoof max-w-2xl text-lg">
            This is not just our company — it's our legacy. Signavox stands for trust, transformation, and a fearless journey into the future.
          </Typography>
          <div className="space-y-6 mt-10">
            <div className="flex items-center gap-4">
              <Security className="text-3xl text-yellow-200" />
              <span className="text-white font-bold text-lg md:text-xl">Encrypted Data</span>
              <span className="text-purple-200 text-base md:text-lg">– Military-grade protection to secure your credentials.</span>
            </div>
            <div className="flex items-center gap-4">
              <FlashOn className="text-3xl text-yellow-400" />
              <span className="text-white font-bold text-lg md:text-xl">Fast Performance</span>
              <span className="text-purple-200 text-base md:text-lg">– Login and access in milliseconds.</span>
            </div>
            <div className="flex items-center gap-4">
              <Public className="text-3xl text-blue-200" />
              <span className="text-white font-bold text-lg md:text-xl">Global Reach</span>
              <span className="text-purple-200 text-base md:text-lg">– Trusted by professionals in 20+ countries.</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 w-full px-6 md:px-0">
            <Typography variant="body2" className="text-purple-200/80 text-xs font-spoof">
              © 2025 <span className="font-bold">signavox</span>. All rights Reserved | <span className="underline cursor-pointer">Privacy Policy</span> | <span className="underline cursor-pointer">Terms of Use</span> | <span className="underline cursor-pointer">Cookies Policy</span>
            </Typography>
          </div>
        </motion.div>
      </div>
      {/* Right Section - Login Form 40% */}
      <div className="w-full md:w-[40%] flex items-center justify-center min-h-screen bg-gradient-to-br from-[#311188]/90 to-[#0A081E]/90">
        <Card className="w-full max-w-lg mx-auto shadow-2xl rounded-3xl p-4 md:p-10 bg-gradient-to-br from-[#311188]/90 to-[#0A081E]/90 border-2 border-purple-200/30">
          <CardContent className="flex flex-col items-center w-full">
            <motion.form onSubmit={handleLogin} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full flex flex-col gap-6">
              <div className="flex flex-col items-center mb-2">
                <Person className="text-6xl text-purple-200 mb-2 drop-shadow-lg" />
                <Typography variant="h4" className="font-bold text-purple-100 font-spoof mb-2">Sign in</Typography>
              </div>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className="text-purple-300" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: '#fff', fontSize: '1.15rem', fontFamily: 'Spoof Trial, sans-serif' },
                  label: { color: '#b39ddb' },
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(49,17,136,0.15)',
                    borderRadius: '14px',
                    border: '2px solid #b39ddb33',
                    color: '#fff',
                    fontSize: '1.15rem',
                    fontFamily: 'Spoof Trial, sans-serif',
                    minHeight: '56px',
                    '& fieldset': { border: 'none' },
                    '&:hover': { background: 'rgba(49,17,136,0.22)' },
                    '&.Mui-focused': { background: 'rgba(49,17,136,0.25)' },
                  },
                }}
              />
              <div className="flex flex-col gap-1">
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-purple-300" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    input: { color: '#fff', fontSize: '1.15rem', fontFamily: 'Spoof Trial, sans-serif' },
                    label: { color: '#b39ddb' },
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(49,17,136,0.15)',
                      borderRadius: '14px',
                      border: '2px solid #b39ddb33',
                      color: '#fff',
                      fontSize: '1.15rem',
                      fontFamily: 'Spoof Trial, sans-serif',
                      minHeight: '56px',
                      '& fieldset': { border: 'none' },
                      '&:hover': { background: 'rgba(49,17,136,0.22)' },
                      '&.Mui-focused': { background: 'rgba(49,17,136,0.25)' },
                    },
                  }}
                />
                <span className="text-right text-purple-200 text-sm mt-1 cursor-pointer hover:underline transition-all duration-200">Forgot password ?</span>
              </div>
              {error && <div className="text-red-400 text-center font-bold text-base">{error}</div>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                disabled={loading}
                endIcon={<ArrowForward />}
                sx={{
                  background: 'linear-gradient(135deg, #311188 0%, #0A081E 100%)',
                  fontWeight: 'bold',
                  fontFamily: 'Spoof Trial, sans-serif',
                  fontSize: '1.2rem',
                  borderRadius: '14px',
                  minHeight: '56px',
                  boxShadow: '0 8px 32px 0 rgba(49, 17, 136, 0.18)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0A081E 0%, #311188 100%)',
                  },
                }}
              >
                {loading ? <CircularProgress size={28} color="inherit" /> : 'Sign in'}
              </Button>
              <div className="flex justify-between items-center mt-2 text-sm md:text-base">
                <span>Don't have an account? <span className="font-bold text-purple-200 cursor-pointer hover:underline">Sign Up</span></span>
              </div>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login; 