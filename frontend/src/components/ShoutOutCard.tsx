import ShoutOut from "../model/ShoutOut";

interface Props {
    shoutOut: ShoutOut;
    onDelete: () => void;
  }

function ShoutOutCard({shoutOut, onDelete}: Props) {

    return (
        <div className="ShoutOutCard">
            <h3>Shout out to {shoutOut.to} </h3>
            <p>-from {shoutOut.from} </p>
            <p> {shoutOut.message} </p>
        </div>
    )
}

export default ShoutOutCard;