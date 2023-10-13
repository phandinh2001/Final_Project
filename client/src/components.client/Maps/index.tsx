import React from "react";

const Maps = () => {
  return (
    <div className="col-md-6 d-flex">
      <div id="map" className="bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15089.676617963438!2d105.46324612453158!3d19.00124298267287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3137612f7820fbd5%3A0x82cb20cd36797105!2zdHQuIFnDqm4gVGjDoG5oLCBZw6puIFRow6BuaCwgTmdo4buHIEFuLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1666031066067!5m2!1svi!2s"
          width="540"
          height="600"
          style={{ border: "0" }}
          //   allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};
export default Maps
