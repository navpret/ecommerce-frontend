import React from 'react'
import {Link} from 'react-router-dom'

export default function BtnRenderer() {
    return (
        <>
            <Link className="btn_buy" to="#!">
                    Buy
                </Link>
            <Link className="btn_cart" to="#!">
                +Cart
            </Link>
        </>
    )
}
