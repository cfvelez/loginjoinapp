import {useSelector} from 'react-redux';

const useStackView = () => useSelector(state => state.stackView)

export default useStackView;
