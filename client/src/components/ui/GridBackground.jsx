const GridBackground = ({ children }) => {
	return (
		<div className=" w-full min-h-screen bg-black text-white bg-grid-white/[0.2]  relative  ">
      
      <div className='absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]'></div>
			{children}
		</div>
	);
};
export default GridBackground;