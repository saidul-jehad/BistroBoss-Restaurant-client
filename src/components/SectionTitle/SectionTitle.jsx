
const SectionTitle = ({heading, subHeading }) => {
    return (
        <div className="mx-auto md:w-4/12 text-center my-9">
            <h3 className="text-yellow-600 ">---{subHeading}---</h3>
            <h3 className="text-3xl border-y-4  py-3 my-4 mt-2" >{heading}</h3>

        </div>
    );
};

export default SectionTitle;