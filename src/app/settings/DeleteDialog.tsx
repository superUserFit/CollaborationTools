"use client";

//  Import React libraries
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import axios from '../api/api';
import Cookies from 'js-cookies';

//  Import UI Components
import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

//  Import custom components
import tokenAtom from '../atoms/tokenAtom';
import useShowToast from '../hooks/useShowToast';


const DeleteDialog = ({ children, user }) => {
    const [deleteAction, setDeleteAction] = useState(false);
    const [deleteData, setDeleteData] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const [token, setToken] = useRecoilState(tokenAtom);
    const router = useRouter();

    const showToast = useShowToast();

    useEffect(() => {
        if(deleteData === user.email) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

    }, [deleteData]);


    const handleDeleteAccount = async (e:any) => {
        e.preventDefault();

        const response = await axios.delete('/user/delete-user', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if(!response.data) {
            return;
        }

        const data = response.data;

        showToast('Success', data.message, 'success');
        Cookies.removeItem('Infollective');
        setToken(null);
        setIsDisabled(false);
        router.push('/auth/login');
    }


    return (
        <AlertDialog>
        <AlertDialogTrigger className='w-full'>
            <Button className='w-full text-gray-200 bg-red-500 dark:bg-red-600'>
                {children}
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={`${isMobile? 'text-center': ''} w-[80%] rounded-md`}>
            <AlertDialogHeader>Are you should that you want to delete this account?</AlertDialogHeader>
            <AlertDialogDescription className='flex justify-center flex-col items-center'>
                <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
                <div className='flex flex-col mt-8 gap-2 w-[60%]'>
                    {!deleteAction ? <Button className='w-full bg-red-500 dark:bg-red-600 text-white' onClick={() => setDeleteAction(true)}>I understand this action</Button> : ''}
                    {!deleteAction ? '':
                    <form onSubmit={handleDeleteAccount} className='text-center'>
                        <p className='text-center'>Please enter the email that is used by this account:</p>
                        <strong className='text-center'>{user.email}</strong>
                        <Input className='w-full' autoComplete='no' value={deleteData} onChange={(e) => setDeleteData(e.target.value)} />
                        <Button className='w-full mt-2 bg-red-500 text-white hover:bg-red-700' disabled={isDisabled}>Delete account</Button>
                    </form>}
                    <AlertDialogCancel className='w-full bg-green-500 dark:bg-green-600 text-white' onClick={() => setDeleteAction(false)}>Cancel</AlertDialogCancel>
                </div>
            </AlertDialogDescription>
        </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteDialog;