import React, { useState, Fragment, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Navbar,
} from "@material-tailwind/react";
import Chatbot from "../components/Chatbot";
import ChatbotBtn from "../components/ChatbotBtn";
import Loader from "../components/Loader";
import NavBar from '../components/Navbar';
 

const Faqs = () => {
    const [open, setOpen] = useState(0);
    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    
    const customAnimation = {
        mount: { scale: 1 },
        unmount: { scale: 0.9 },
    };

    const [ isLoading, setIsLoading ] = useState(true);

  const toggleLoader = () => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000)
  }

  const [ showChatbot, setShowChatbot ] = useState(false);
  const toggleShowChatbot = () => {
    setShowChatbot(prevValue => !prevValue)
  }

  useEffect(() => {
    toggleLoader()
  }, [])

  return (
    <Fragment>
      <div className='h-full overflow-auto w-full py-4'>
        {showChatbot && <Chatbot toggleShowChatbot={toggleShowChatbot}/>}
        {
          isLoading ?
          <Loader />:
          <div className="flex flex-col gap-4 w-full h-full items-center px-3">
          
              {/* Navbar starts here */}
              <NavBar />
              {/* Navbar ends here */}
            
            {/* Main Section starts here */}
            <div className='w-full max-w-md'>
              <div>
                <h2 className='py-3 border-b text-2xl text-purple-900 font-bold'>Frequently Asked Questions</h2>
              </div>
              <Accordion open={open === 1} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(1)} className='text-md'>
                  How can I locate the nearest SAR Center?
                </AccordionHeader>
                <AccordionBody>
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and actualize our
                  dreams.
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(2)} className='text-md'>
                  How can I locate the nearest SAR Center?
                </AccordionHeader>
                <AccordionBody>
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and actualize our
                  dreams.
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(3)} className='text-md'>
                  How can I locate the nearest SAR Center?
                </AccordionHeader>
                <AccordionBody>
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and actualize our
                  dreams.
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 4} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(4)} className='text-md'>
                  How can I locate the nearest SAR Center?
                </AccordionHeader>
                <AccordionBody>
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and actualize our
                  dreams.
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 5} animate={customAnimation}>
                <AccordionHeader onClick={() => handleOpen(5)} className='text-md'>
                  How can I locate the nearest SAR Center?
                </AccordionHeader>
                <AccordionBody>
                  We&apos;re not always in the position that we want to be at.
                  We&apos;re constantly growing. We&apos;re constantly making mistakes.
                  We&apos;re constantly trying to express ourselves and actualize our
                  dreams.
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        }
    </div>
    </Fragment>
  )
}

export default Faqs;