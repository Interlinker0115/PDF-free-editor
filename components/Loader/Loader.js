const Loader = ({ show = false }) => show ? (
    <div className='fixed z-[1000] inset-0 h-full w-full overflow-hidden flex flex-col justify-center items-center'>
        <img className='w-1/4 h-1/4' src='/bars.svg' />
    </div>
) : null;

export default Loader;