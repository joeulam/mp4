'use client'
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation'; // useRouter for app router
import React, { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const openSlug = () => {
    router.push(`/${location.toLowerCase()}`);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1>GIVE ME YOUR LOCATION</h1>
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
