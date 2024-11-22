import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
// import { log } from 'console';

const Signup = () => {
    const [input, setInput] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use navigation for redirection

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const validateInput = () => {
        if (!input.username || !input.email || !input.password) {
            toast.error('All fields are required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(input.email)) {
            toast.error('Please enter a valid email');
            return false;
        }
        if (input.password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return false;
        }
        return true;
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        
        if (!validateInput()) return;

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, // Ensure credentials are sent
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setInput({ username: "", email: "", password: "" });
                navigate("/login"); // Redirect to login after successful signup
            } else {
                toast.error(res.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center shadow  justify-center overflow-hidden'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8 overflow-hidden'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Signup to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='font-medium'>Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Signup</Button>
                    )
                }
                <span className='text-center'>
                    Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Signup;
