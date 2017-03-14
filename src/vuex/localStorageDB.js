/**
* LOCAL_STORAGE_DB
* PARAMS = METHODE FIND // FINDINDEX { array }.
*/
let db = {};

/**
* SET
*************
* SI ELEMENT AJOUTE
* true;
*/
db.SET = function(namespace, data, params = undefined) {
  // Recup des données.
  let getNamespace = JSON.parse(localStorage.getItem(namespace));
  // Tests d'existence.
  if (getNamespace == null) {
    localStorage.setItem(namespace, JSON.stringify('[]'));
    getNamespace = [];
  }
  // Insertion.
  // Si aucune fonction n'est passée.
  if (typeof params == 'undefined') {
    getNamespace.push(data);
    localStorage.setItem(namespace, JSON.stringify(getNamespace));
    return true;
  } else {
    // On vérifie si par param la donnée existe.
    let findData = getNamespace.findIndex(params);
    // Si elle n'existe pas on l'ajoute;
    if (findData == -1) {
      getNamespace.push(data);
      localStorage.setItem(namespace, JSON.stringify(getNamespace));
      return true;
    } else {
      if (!getNamespace[findData].toString() == data.toString()) {
        getNamespace[findData] = data;
        localStorage.setItem(namespace, JSON.stringify(getNamespace));
        return true;
      }
    }
  }
};

/**
* GET
*************
* AVEC PARAMS : index + data,
* {index: index, data: data};
*************
* SANS PARAMS : data.
* {data: data};
*************
* SI L ELEMENT N EXISTE pas
* {index: undefined, data: undefined}; // {data: undefined}
*/
db.GET = function(namespace, params = undefined) {
  // Recup des données.
  let getNamespace = JSON.parse(localStorage.getItem(namespace));
  // Tests d'existence.
  if (getNamespace == null) {
    return {
      data: undefined
    }
  } else {
    // Si aucune fonction n'est passée.
    if (typeof params == 'undefined') {
      return {
        data: getNamespace
      }
    } else {
      // On vérifie si par param la donnée existe.
      let findData = getNamespace.findIndex(params);
      // Si elle n'existe pas on l'ajoute;
      if (findData == -1) {
        return {
          index: undefined,
          data: undefined
        }
      } else {
        return {
          index: findData,
          data: getNamespace[findData]
        }
      }
    }
  }
};


/**
* REMOVE
*************
* SI L ELEMENT A ETE SUPPRIME
* true;
*************
* SI L ELEMENT N EXISTE PAS.
* false;
*/
db.REMOVE = function(namespace, params) {
  // Récup des données.
  let getNamespace = this.GET(namespace, params);
  // Tets d'existence.
  if (typeof getNamespace.data == 'undefined') {
    return false;
  } else {
    let getAllData = this.GET(namespace).data;
    getAllData.splice(getNamespace.index, 1);
    localStorage.setItem(namespace, JSON.stringify(getAllData));
    return true;
  }
};

export default {
  db
}
