import Node from '../core/Node.js';
import CameraNode from './CameraNode.js';
import ModelNode from './ModelNode.js';
import OperatorNode from '../math/OperatorNode.js';
import PositionNode from './PositionNode.js';

class ModelViewProjectionNode extends Node {

	constructor( position = new PositionNode() ) {

		super( 'vec4' );

		this.position = position;

		this._mvpMatrix = new OperatorNode( '*', new CameraNode( CameraNode.PROJECTION_MATRIX ), new ModelNode( ModelNode.VIEW_MATRIX ) );

	}

	generate( builder ) {

		const mvpSnipped = this._mvpMatrix.build( builder );
		const positionSnipped = this.position.build( builder, 'vec3' );

		return `( ${mvpSnipped} * vec4( ${positionSnipped}, 1.0 ) )`;

	}

}

export default ModelViewProjectionNode;
