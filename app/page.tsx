'use client'
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const openSlug = () => {
    router.push(`/${location.toLowerCase()}`);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1>Enter a city for its weather !</h1>
        <TextField
          id="input"
          label="City location"
          variant="filled"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button sx={{display:"block"}} onClick={openSlug}>Search</Button>
      </div>
    </div>
  );
}
