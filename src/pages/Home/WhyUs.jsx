import React from 'react';

function WhyUs() {
  const elements = [
    {
      id: 1,
      icon: '🛡️',
      title: 'Funds Held in Escrow',
      description:
        'Money is only released when the deal is complete and both parties are satisfied.',
      bgColor: 'bg-blue-600'
    },
    {
      id: 2,
      icon: '💳',
      title: 'Both Parties are Verified',
      description:
        'Reduce fraud with verified accounts, adding an extra layer of security.',
      bgColor: 'bg-green-600'
    },
    {
      id: 3,
      icon: '🪙',
      title: 'Instant Refund Guarantee',
      description:
        'If something goes wrong, benefit from our 100% money-back guarantee.',
      bgColor: 'bg-orange-500'
    },
  ];

  return (
    <div className="bg-blue-50 dark:bg-gray-900 text-gray-900 dark:bg-gradient from-blue-50 to-gray-50 dark:text-white p-8 flex flex-col md:flex-row items-center justify-center gap-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">
          Your Trust & Safety Guaranteed
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {elements.map((ele) => (
            <div
              key={ele.id}
              className="flex flex-row items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <div className={`w-32 h-16 rounded-full flex items-center justify-center ${ele.bgColor}`}>
                <span className="text-3xl">{ele.icon}</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-xl mb-2">{ele.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{ele.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
