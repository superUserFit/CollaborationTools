import { getUser } from "../api/UniversalFunctions";


export const getServerSideProps = async (context) => {
    const token = context.req.cookies['Infollective'];
    let user = null;

    try {
        const response = await getUser(token);

        user = response;
    } catch(error) {
        console.error('Error: ', error.response.data.message);
    }

    return {
        props: {
            user,
            token
        }
    };
}