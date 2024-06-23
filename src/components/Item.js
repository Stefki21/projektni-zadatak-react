import './Item.css';
import React, { useContext, useEffect } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ItemData from "../store/central-store";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Item (props) {
    const itemCtx = useContext(ItemData);
    const { firstRenderDone, setFirstRenderDone, activeItemId} = itemCtx;
    const navigate = useNavigate();

    function stockCheck(stock) {
        if (stock > 0 && stock < 100) {
          return 'Available';
        } else if (stock <= 0) {
          return 'Not Available';
        } else {
          return 'Sale';
        }
      }

function editButtonHandler () {
    itemCtx.setFirstRenderDone(true);
    itemCtx.setActiveItemId(props.id);
}

useEffect(()=> { if(firstRenderDone && activeItemId){navigate(`/edit/:${activeItemId}`);} setFirstRenderDone(false)}, [activeItemId, navigate, firstRenderDone, setFirstRenderDone])

function deleteButtonHandler (itemId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          itemCtx.dispatchItems({task: 'delete', itemId: itemId});
            fetch(`https://dummyjson.com/products/${itemId}`, {
            method: "DELETE",
            })
            .then((res) => res.json())
            .then((data) => console.log(data.id));
        }
      });
}
    const stockAvailability = stockCheck(props.stock);
    const itemDesc = props.desc.length > 50 ? props.desc.slice(0, 50) + '..' : props.desc;

    return (
        <React.Fragment>
            <p className='idNumber'>#{props.id}</p>
            <p>{props.title}</p>
            <p>{itemDesc}</p>
            <p>{props.brand}</p>
            <p>${props.price}</p>
            <p>{props.category && props.category.charAt(0).toUpperCase() + props.category.slice(1)}</p>
            <div className='stockContainer'>
                <p className={stockAvailability.trim() + ' stockText'}>{stockAvailability}</p> 
            </div>
            <div className='buttonContainer'>
                <Button className='editButton' onClick={editButtonHandler}><FontAwesomeIcon icon="far fa-edit" style={{fontSize: '1.5rem'}}/> </Button>
                <Button className='deleteButton' onClick={() => deleteButtonHandler(props.id)}><FontAwesomeIcon icon="fa-regular fa-trash-can" style={{fontSize: '1.5rem'}}/></Button>
            </div>
        </React.Fragment>
    )
}

export default Item;