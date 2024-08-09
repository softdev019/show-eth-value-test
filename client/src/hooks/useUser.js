import useAuth from "./useAuth"
import useAxiosPrivate from "./usePrivate"
import Web3 from 'web3';
const web3 = new Web3(`https://mainnet.infura.io/v3/62ddb123eed04c1fb06e3591a0e0f13c`);
export default function useUser() {

    const { isLoggedIn, setUser, setIsLoggedIn } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    async function getUser() {
        if (!isLoggedIn) {
            return
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/user')
            console.log(data)
            const balanceInWei = await web3.eth.getBalance(data.ethereum);
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            const newData = {...data, balance: balanceInEther}
            console.log(newData)
            setUser(newData)
        } catch (error) {
            console.log("===", error.response)
        }
    }

    return getUser
}
