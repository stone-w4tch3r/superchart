import {useState} from "react";

interface Props {
    items: string[];
    header: string;
}

function ListGroup({items, header}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return <>
        <h1>List Group</h1>
        {items.length === 0 && <p>No items found.</p>}
        <ul
            className="list-group"
        >{
            items.map((item, i) =>
                <li
                    key={item}
                    className={`list-group-item ${i === selectedIndex ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(i)}
                >
                    {item}
                </li>
            )
        }
        </ul>
    </>;
}

export default ListGroup;