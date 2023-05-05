import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver'
import { fabric } from 'fabric';
import { AiOutlineDownload } from 'react-icons/ai';
import { BiText } from 'react-icons/bi';
import { BiRectangle } from 'react-icons/bi';
import { FaRegCircle } from 'react-icons/fa';
import { BsTriangle } from 'react-icons/bs';
import { BiPolygon } from 'react-icons/bi';






function AddCaption() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState('');
  const [imageData, setImageData] = useState(null);

  const downloadImage = () => {
    saveAs(imageData.urls.thumb, 'image.jpg');
  }
  useEffect(() => {
    const url = `https://api.unsplash.com/photos/${id}?client_id=Jhbq_p0lX5TQ3GefLzACyCDEf4QrBHHCzQTexIl4T4E`;
    axios.get(url)
      .then(response => {
        setImageData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);





  const initCanvas = () => {
    const canvas = new fabric.Canvas("canvas", {
      height: 300,
      width: 300,
      backgroundColor: "pink",
      left: 100,
      top: 100,
    });

    if (imageData) {
      fabric.Image.fromURL(
        imageData.urls.thumb,
        function (img) {
          canvas.setBackgroundImage(
            img,
            canvas.renderAll.bind(canvas),
            {
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            }
          );
        },
        { crossOrigin: "anonymous" }
      );
    }

    return canvas;
  };

  useEffect(() => {
    if (imageData) {
      setCanvas(initCanvas());
    }
  }, [imageData]);



  const reactangle = canvi => {
    const rect = new fabric.Rect({
      height: 100,
      width: 100,
      fill: 'white',
      left: 100,
      top: 100
    });
    canvi.add(rect);
    canvi.renderAll();
  }
  const circle = canvi => {
    const cir = new fabric.Circle({
      radius: 50,
      fill: '',
      stroke: 'black',
      strokeWidth: 3,
      left: 100,
      top: 100,
      hasControls: true,
      hasBorders: true,
      lockUniScaling: true,
      lockScalingFlip: true,
      lockRotation: false
    });

    canvi.add(cir);
    canvi.renderAll();
  }
  const addtext = canvi => {
    const text = new fabric.IText('enter text here', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 'white',
      left: 100,
      top: 100,
      editable: true,
      draggable: true,
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      centeredScaling: true,
      centeredRotation: true

    });
    canvi.add(text);
    canvi.renderAll();
  }
  const triangle = canvi => {
    const triangle = new fabric.Triangle('hello', {
      width: 150,
      height: 100,
      fill: '',
      stroke: 'green',
      strokeWidth: 3,
      cornerColor: 'blue',
      angle: 45,
      left: 100,
      top: 100
    });
    canvi.add(triangle);
    canvi.renderAll();
  }
  const polygon = canvi => {
    const polygon = new fabric.Polygon([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 100 }
    ], {
      fill: 'white',
      stroke: 'black',
      strokeWidth: 3,
      left: 100,
      top: 100,
      hasControls: true,
      hasBorders: true,
      lockRotation: true
    });
    canvi.add(polygon);
  }

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);


  return (
    <>
          <h1 style={{ textAlign: "center",background:"skyblue",marginBottom:'0' }}>Add caption page</h1>

      <div className='canvas-div'>

        <div className='cana-container'>
          <div className='main-canva'>
            <canvas id="canvas"
              width="600"
              height="200">
            </canvas>
            <button onClick={downloadImage} className='download'><AiOutlineDownload /></button>

           

          </div>
          </div><br />
          <div className='button-container'>
          <h4>Add Shapes</h4>
            <button className='btn btn-primary' onClick={() => addtext(canvas)}><BiText/></button>
            <button className='btn btn-primary' onClick={() => reactangle(canvas)}> <BiRectangle/></button>
            <button className='btn btn-primary' onClick={() => circle(canvas)}> <FaRegCircle/></button>
            <button className='btn btn-primary' onClick={() => triangle(canvas)}>  <BsTriangle/></button>
            <button className='btn btn-primary' onClick={() => polygon(canvas)}>  <BiPolygon/></button>

        </div>

      </div>



    </>
  );
}

export default memo(AddCaption);