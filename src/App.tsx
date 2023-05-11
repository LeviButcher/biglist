import { useEffect, useState, memo, useCallback } from 'react'
import './App.css'

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

// @ts-ignore
const items: Item[] = sizes.reduce(
    // @ts-ignore
    (items, size) => [
        ...items,
        ...fruits.reduce(
            // @ts-ignore
            (acc, fruit) => [
                ...acc,
                ...colors.reduce(
                    // @ts-ignore
                    (acc, color) => [
                        ...acc,
                        {
                            name: `${size} ${color} ${fruit}`,
                            color,
                        },
                    ],
                    [],
                ),
            ],
            [],
        ),
    ],
    [],
);

type Item = {
    name: string,
    color: string
}
type SelectedItem = Item & {
    selected?: boolean
}

type ListItemProps = SelectedItem & {
    onClick: (n: string) => void
}

function ListItem({ color, name, selected, onClick }: ListItemProps) {
    useEffect(() => { console.log(`rerender: ${name}`) })

    return (
        <li className={`List__item List__item--${color}`} data-selected={selected}
            onClick={() => onClick(name)}>
            {name}
        </li>
    );
}

const ListItemMemo = memo(ListItem)

const List = ({ items }: { items: Item[] }) => {
    const [selectedItems, setSelected] = useState<SelectedItem[]>(items)

    const toggleSelected = useCallback((name: string) => {
        setSelected(prev => prev.map((cur) => cur.name == name ? { ...cur, selected: !cur.selected } : cur, []))
    }, [])

    const selected = selectedItems.filter(x => x.selected)

    return (<>
        <section>
         {selected.map(x => x.name).join(', ')}
        </section>
        <ul className="List">
            {selectedItems.map((item) => <ListItemMemo key={item.name} {...item} onClick={toggleSelected} />)}
        </ul>
    </>);
}


function App() {

    return (
        <>
            <List items={items} />
        </>
    )
}

export default App
