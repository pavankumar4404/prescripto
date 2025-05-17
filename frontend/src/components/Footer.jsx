import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiOutlineProfile } from 'react-icons/ai';
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 my-10 text-sm'>
                <div>
                    <img className='mb-5 w-40 mx-auto sm:mx-0' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 mx-auto text-gray-600 leading-6 sm:text-left'>
                        Prescripto is committed to excellence in healthcare technology, we continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you are booking your appointment or managing ongoing care, Prescripto is here to support you every step of the way.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Information</p>
                    <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                        <NavLink onClick={() => { scrollTo(0, 0) }} to={'/'}>Home</NavLink>
                        <NavLink onClick={() => { scrollTo(0, 0) }} to={'/doctors'}>All Doctors</NavLink>
                        <NavLink onClick={() => { scrollTo(0, 0) }} to={'/about'}>About Us</NavLink>
                        <NavLink onClick={() => { scrollTo(0, 0) }} to={'/contact'}>Contact Us</NavLink>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                        <li>+91-212-456-7890</li>
                        <li className="flex items-center gap-2">
                            <IoMailOutline className="text-gray-600 hover:text-black" size={20} />
                            <a href="mailto:itxnargiskhatun@gmail.com" title="My Gmail account" aria-label="Gmail icon" className="text-gray-900 hover:text-black">
                                itxnargiskhatun@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <AiOutlineProfile className="text-gray-600 hover:text-black" size={20} />
                            <a href="https://itxnargis.github.io/personal-portfolio/"
                                title="View my portfolio"
                                aria-label="Portfolio link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-900 hover:text-black"
                            >
                                View My Portfolio
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Follow Me</p>
                    <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                        <li className="flex gap-2 justify-start">
                            <a href="https://github.com/itxnargis" title="Connect to Github" aria-label="Github icon" className="text-gray-600 hover:text-black">
                                <AiFillGithub size={20} />
                            </a>
                            <a href="https://x.com/81283nargis?s=09" title="My personal Twitter account" aria-label="Twitter icon" className="text-gray-600 hover:text-black">
                                <AiOutlineTwitter size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/" title="My LinkedIn account" aria-label="LinkedIn icon" className="text-gray-600 hover:text-black">
                                <AiFillLinkedin size={20} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;