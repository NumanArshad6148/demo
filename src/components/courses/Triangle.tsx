
const TriangleShape = (props: any):JSX.Element => {
    return <polygon {...props} points={calcTrianglePoints(props.cx, props.cy, props.r * 2, props.angle || 0)} />;
  };
  /** *
   * Calc points of the triangle
   *
   * @param xCenter The X-coordinate of the center of triangle
   * @param yCenter The Y-coordinate of the center of triangle
   * @param sideLength The length of the side
   * @param angle The angle in degrees
   */
  const calcTrianglePoints = (xCenter: number, yCenter: number, sideLength: number, angle: number = 0): string => {
    const r = (Math.sqrt(3) / 3) * sideLength; // The radius of the circumscribed circle
    const h = (Math.sqrt(3) / 2) * sideLength; // The height of median
  
    const angleInRadian = (Math.PI * angle) / 180;
  
    const pointCenter: [number, number] = [xCenter, yCenter];
    const pointCenterNew: [number, number] = rotatePoint(pointCenter, angleInRadian);
  
    // 1st point
    const point1 = movePointToNewCoordinates(
      rotatePoint([xCenter, yCenter - r], angleInRadian),
      pointCenterNew,
      pointCenter
    );
    const x1 = point1[0];
    const y1 = point1[1];
  
    // 2nd point
    const point2 = movePointToNewCoordinates(
      rotatePoint([xCenter - sideLength / 2, yCenter + (h - r)], angleInRadian),
      pointCenterNew,
      pointCenter
    );
    const x2 = point2[0];
    const y2 = point2[1];
  
    // 3rd point
    const point3 = movePointToNewCoordinates(
      rotatePoint([xCenter + sideLength / 2, yCenter + (h - r)], angleInRadian),
      pointCenterNew,
      pointCenter
    );
    const x3 = point3[0];
    const y3 = point3[1];
  
    return `${x1},${y1},${x2},${y2},${x3},${y3}`;
  };
  
  /** *
   * Move point to the new coordinate regarding center
   *
   * @param point The coordinate of point
   * @param center The new center
   * @param centerOld The old center
   */
  const movePointToNewCoordinates = (
    point: [number, number],
    center: [number, number],
    centerOld: [number, number]
  ): [number, number] => {
    const x = point[0];
    const y = point[1];
    const xCenter = center[0];
    const yCenter = center[1];
    const xCenterOld = centerOld[0];
    const yCenterOld = centerOld[1];
    return [x - xCenter + xCenterOld, y - yCenter + yCenterOld];
  };
  
  /** *
   * Rotate point
   *
   * @param point The coordinate of point
   * @param center The angle in radians
   */
  const rotatePoint = (point: [number, number], angle: number): [number, number] => {
    const x = point[0];
    const y = point[1];
  
    const xNew = x * Math.cos(angle) - y * Math.sin(angle);
    const yNew = x * Math.sin(angle) + y * Math.cos(angle);
  
    return [xNew, yNew];
  };

  export default TriangleShape;