const Username = ({ username }) => {
    const nameParts = username.split(' ');
    return (
        <>
            <div className='username-div'>
                {nameParts.map((part, index) => (
                    <h1 className='username' key={index}>{part}</h1>
                ))}
            </div>

        </>
    );
}

export default Username;