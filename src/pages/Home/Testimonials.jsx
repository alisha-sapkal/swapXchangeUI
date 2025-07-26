import React from 'react';
import { Goal, Tickets, Ticket, Gamepad2 } from 'lucide-react';
import { TbGiftCardFilled } from 'react-icons/tb';
import { PiSneakerFill } from 'react-icons/pi';
import seller from '../../assets/seller.png';
import freelancer from '../../assets/freelancer.png';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      icon: <Goal size={40} color="#000000" />,
      title: 'Physical Goals',
      bg: 'bg-blue-500',
    },
    {
      id: 2,
      icon: <Tickets size={40} color="#000000" />,
      title: 'Digital Vouchers',
      bg: 'bg-green-500',
    },
    {
      id: 3,
      icon: <Ticket size={40} color="#000000" />,
      title: 'Event Tickets',
      bg: 'bg-yellow-500',
    },
    {
      id: 4,
      icon: <TbGiftCardFilled size={40} color="#000000" />,
      title: 'Coupons/Gift Cards',
      bg: 'bg-red-500',
    },
    {
      id: 5,
      icon: <Gamepad2 size={40} color="#000000" />,
      title: 'In-Game Items',
      bg: 'bg-violet-500',
    },
    {
      id: 6,
      icon: <PiSneakerFill size={40} color="#000000" />,
      title: 'Sneakerheads',
      bg: 'bg-purple-500',
    },
    {
      id: 7,
      icon: <img src={seller} alt="Reseller" className="w-[40px] h-[40px]" />,
      title: 'Reseller',
      bg: 'bg-gray-500',
    },
    {
      id: 8,
      icon: (
        <img src={freelancer} alt="Freelancer" className="w-[40px] h-[40px]" />
      ),
      title: 'Freelancers',
      bg: 'bg-green-300',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 dark:bg-gray-900 bg-blue-50 min-h-screen">
      <h1 className="font-bold text-2xl text-center m-4">
        Perfect for transactions involving:
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-12 mt-4'>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center gap-2 p-4 rounded-lg"
          >
            <div
              className={`text-black h-20 w-20 flex justify-center items-center rounded-full ${testimonial.bg}`}
            >
              {testimonial.icon}
            </div>
            <h2 className="text-center font-medium">{testimonial.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
