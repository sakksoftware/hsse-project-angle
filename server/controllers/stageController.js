const mongoose = require('mongoose');

const StageModelClass = mongoose.model('stages');

exports.create = (req, res) => {

    const newStage = new StageModelClass(req.body);

    newStage.save( (err) => {
        if(err) {
            return res.status(422).send({
                message: 'Unable to save new stage'
            });
        } else {
            res.status(201).send(newStage);
        }

    });
    
}

exports.read = (req, res) => {

    const { stageId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(stageId)) {
        return res.status(400).send({
            message: 'Article is invalid'
        });
    }

    StageModelClass.findById(stageId, (err, stage) => {
        if(err) {
            return res.send(err);
        } else if(!stage) {
            return res.status(404).send({
                message: 'No state with that identifier has been found'
            });
        }
        return res.status(200).send(stage);
    });

}

exports.update = (req, res) => {
    StageModelClass.findByIdAndUpdate(req.params.stageId, req.body, (err ) => {

    });
}

exports.delete = (req, res) => {
    StageModelClass.findByIdAndRemove(req.params.stageId, (err) => {
        if(err) {
            res.send(err);
        } else {
            res.json({ message: 'Stage has been removed!'});
        }
    })
}


exports.list = function (req, res) {
    StageModelClass.find().exec(function (err, stages) {
      if (err) {
        return res.status(422).send({
          message: 'Unable to find stages'
        });
      } else {
        res.json(stages);
      }
    });
  };