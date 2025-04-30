<?php

namespace App\Http\Controllers\Group;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Group\GroupRequest;
use App\Models\Group;
use App\Models\User;
use Exception;

class GroupController extends Controller
{
    public function store(GroupRequest $request)
    {
        try {
            $group = auth()->user()->groups()->create([
                'name' => $request->name,
            ]);

            return response()->json([
                'message' => 'Group created successfully',
                'group' => $group,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to create group',
                'errors' => ['server' => [$e->getMessage()]],
            ], 500);
        }
    }

    public function fetchGroups()
    {
        try {
            $groups = auth()->user()->groups;

            return response()->json([
                'message' => 'Groups fetched successfully',
                'groups' => $groups,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch groups',
                'errors' => ['server' => [$e->getMessage()]],
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            $group = auth()->user()->groups()->where('id', $id)->first();
    
            if (!$group) {
                return response()->json([
                    'error' => 'Group not found or unauthorized'
                ], 404);
            }
    
            $group->delete();
    
            return response()->json([
                'message' => 'Group deleted successfully',
                'group' => $group,
            ], 200);
    
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'details' =>$e->getMessage()
            ], 500);
        }
    }
    
    
}
