import React from 'react'
import { Link } from 'react-router-dom'
import { TypewriterEffectSmooth } from '../components/ui/Typewriter';
import { HoverBorderGradient } from '../components/ui/HoverBorder';


const features = [
	{
	  title: "Download expense report",
	  description:
		"Efficiently Store and manage  your expenses ",
	//   icon: Layout,
	},
	{
	  title: "Powerful Al features",
	  description:
		"Scan and manage the bill effectively,get the expense in your hand",
	//   icon: Calendar,
	},
	{
	  title: "Comprehensive Actio",
	  description:
		"User can easily add, delete and update the expenses based on their requirements.",
	//   icon: BarChart,
	},
  ];
  const words = [
    {
      text: "Manage ",
	//   className: "text-xl",
    },
    {
      text: "Expenses",
	//   className: "text-xl",
    },
    // {
    //   text: "apps",
    // },
    {
      text: "with",
	//   className: "text-xl",
    },
    {
      text: "ExpenseManager.",
      className: "text-blue-500 dark:text-blue-500 text-xl",
    },
  ];


const Landing = () => {
  return (
	<div className='flex flex-col items-center justify-center min-h-screen space-y-8'>


		<div className='flex flex-col items-center'>
			<h1 className='text-4xl  sm:text-5xl md:text-6xl font-extrabold pb-6 flex flex-col  text-center'>Streamline your workflow with <br />
			<span className='flex justify-center items-center text-4xl  sm:text-6xl'> AI Powered platform

				</span> 
				</h1>

				<span className='flex flex-col justify-center items-center'>

				<TypewriterEffectSmooth words={words}/>
				<p className='text-xl text-gray-300 mb-6 text-center '>
					Empower your team with our intutive object management solution
				</p>
				</span>


				<Link>
				<HoverBorderGradient>

				<button >
					<Link to="/login">
					Get Started
					</Link>
					</button>
				</HoverBorderGradient>
				
				</Link>
		</div>


		<div className=''>
			<h3  className="text-3xl font-bold mb-12 text-center">Key features</h3>

			<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 '>

		{features.map((feature,index)=>{
			return(

							<div key={index} className='bg-neutral-950 rounded-lg  p-8'>
								<h4 className='text-xl font-semibold mb-2'>
									{feature.title}
								</h4>

								<p>{feature.description}</p>


							</div>
			)
		})}
			</div>
			</div>

		<div>

		</div>





	</div>
  )
}

export default Landing